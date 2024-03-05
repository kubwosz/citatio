package main

import (
	"citatio/internal/server"
	"io/ioutil"
	"net/http"
)

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

func main() {
	server.Start()
	getDOI("123")
}
