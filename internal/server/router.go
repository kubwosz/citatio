package server

import (
	"citatio/internal/domain/cite_styles"
	"citatio/internal/domain/converters"
	"citatio/internal/domain/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"reflect"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
)

//10.1111/febs.13307

func setRouter() *gin.Engine {
	// Creates default gin router with Logger and Recovery middleware already attached
	router := gin.Default()

	// Create API route group
	api := router.Group("/api")
	{
		// Add /hello GET route to router and define route handler function
		api.POST("/references", func(ctx *gin.Context) {
			var dois models.DoiBody
			if err := ctx.BindJSON(&dois); err != nil {
				return
			}

			re := regexp.MustCompile(`(10[.][0-9]{4,}[^\s"/<>]*/[^\s"<>]+)`)
			response := re.FindAllString((dois.Value), -1)

			var references []*models.ReferenceResponse

			referenceSources := cite_styles.ReferenceSource{}
			t := reflect.TypeOf(&referenceSources)

			for i := 0; i < len(response); i++ {
				for j := 0; j < t.NumMethod(); j++ {
					refType := strings.ToLower(t.Method(i).Name)

					paper := GetPaper(response[i])
					method := reflect.ValueOf(referenceSources).MethodByName(t.Method(j).Name)
					reflectResponse := method.Call([]reflect.Value{reflect.ValueOf(paper)})
					referenceValue := reflectResponse[0].Interface().(string)
					references = append(references, &models.ReferenceResponse{Order: i + j, Type: string(refType), Value: referenceValue})
				}
			}
			// paper := GetPaper("10.1111/febs.13307")
			// method := reflect.ValueOf(references).MethodByName(t.Method(i).Name)
			// reflectResponse := method.Call([]reflect.Value{reflect.ValueOf(paper)})
			// response := reflectResponse[0].Interface()

			ctx.JSON(200, references)
		})

		references := cite_styles.ReferenceSource{}
		t := reflect.TypeOf(&references)

		for i := 0; i < t.NumMethod(); i++ {
			refType := strings.ToLower(t.Method(i).Name)

			api.GET(fmt.Sprintf("/reference/%s/*doi", string(refType)), func(ctx *gin.Context) {
				doi := ctx.Param("doi")
				paper := GetPaper(doi)
				// reflectValue := reflect.ValueOf(&t) <-- it was a mistake
				method := reflect.ValueOf(references).MethodByName(t.Method(i).Name)
				reflectResponse := method.Call([]reflect.Value{reflect.ValueOf(paper)})
				response := reflectResponse[0].Interface()

				ctx.JSON(200, response)
			})
		}
	}

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })

	return router
}

func GetPaper(doi string) (paper models.Paper) {
	doiResponse := GetDOI(doi)
	jsonString := []byte(doiResponse)
	var doiFullResponse models.FullDoiResponse
	json.Unmarshal(jsonString, &doiFullResponse)

	paper = converters.DoiToPaper(doiFullResponse)
	return
}

func GetDOI(doi string) string {
	url := "https://api.crossref.org/works/" + doi

	response, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		panic(err)
	}

	return string(body)
}
