package main

import (
	"citatio/internal/server"
	"fmt"
	"io/ioutil"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	url := "https://api.crossref.org/works/10.1111/febs.13307"

	// Make a GET request
	response, err := http.Get(url)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error making GET request: %s", err), http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error reading response body: %s", err), http.StatusInternalServerError)
		return
	}

	// Set the content type header
	w.Header().Set("Content-Type", "text/plain")

	// Write the response to the web server
	w.Write(body)
}

func main() {
	server.Start()
}
