package server

import (
	"citatio/internal/domain/cite_styles"
	"citatio/internal/domain/converters"
	"citatio/internal/domain/models"
	"encoding/json"
	"io/ioutil"
	"net/http"

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
		api.GET("/doi/*doi", func(ctx *gin.Context) {
			doi := ctx.Param("doi")
			paper := GetPaper(doi)
			response := cite_styles.GetReferenceAAA(paper)

			ctx.JSON(200, response)
		})

		api.GET("/reference/aaa/*doi", func(ctx *gin.Context) {
			doi := ctx.Param("doi")
			paper := GetPaper(doi)
			response := cite_styles.GetReferenceAAA(paper)

			ctx.JSON(200, response)
		})

		api.GET("/reference/apa/*doi", func(ctx *gin.Context) {
			doi := ctx.Param("doi")
			paper := GetPaper(doi)
			response := cite_styles.GetReferenceAPA(paper)

			ctx.JSON(200, response)
		})
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
