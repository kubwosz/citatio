package converters

import (
	"citatio/internal/domain/models"
)

func DoiToPaper(doiResponse models.FullDoiResponse) models.Paper {
	var authors []models.Author
	for _, element := range doiResponse.Message.Author {
		author := models.Author{
			Name:     element.Given,
			Surname:  element.Family,
			Sequence: element.Sequence,
		}

		authors = append(authors, author)
	}

	return models.Paper{
		Doi:       doiResponse.Message.Doi,
		Year:      doiResponse.Message.Published.DateParts[0][0],
		Title:     doiResponse.Message.Title,
		Authors:   authors,
		Publisher: doiResponse.Message.Publisher,
		Abstract:  doiResponse.Message.Abstract,
		Link:      doiResponse.Message.URL,
	}
}
