package server

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

func setRouter() *gin.Engine {
	// Creates default gin router with Logger and Recovery middleware already attached
	router := gin.Default()

	// Create API route group
	api := router.Group("/api")
	{
		// Add /hello GET route to router and define route handler function
		api.GET("/doi/:doi1/:doi2", func(ctx *gin.Context) {
			doi1 := ctx.Param("doi1")
			doi2 := ctx.Param("doi2")
			response := getDOI(doi1 + "/" + doi2)

			ctx.JSON(200, response)
		})

		api.GET("/reference/format1/:doi1/:doi2", func(ctx *gin.Context) {
			doi1 := ctx.Param("doi1")
			doi2 := ctx.Param("doi2")
			response := getDOI(doi1 + "/" + doi2)

			jsonString := []byte(response)

			var jsonMap map[string]interface{}
			json.Unmarshal([]byte(jsonString), &jsonMap)

			ctx.JSON(200, response)
		})

		api.GET("/reference/format2/:doi2", func(ctx *gin.Context) {
			doi1 := ctx.Param("doi1")
			doi2 := ctx.Param("doi2")
			response := getDOI(doi1 + "/" + doi2)

			ctx.JSON(200, response)
		})

		api.GET("/reference/format3/:doi2", func(ctx *gin.Context) {
			doi1 := ctx.Param("doi1")
			doi2 := ctx.Param("doi2")
			response := getDOI(doi1 + "/" + doi2)

			ctx.JSON(200, response)
		})
	}

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })

	return router
}

func getDOI(doi string) string {
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
