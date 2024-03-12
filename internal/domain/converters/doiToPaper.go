package converters

import (
	"citatio/internal/domain/models"
	"citatio/internal/server"
)

func DoiToPaper(doiResponse server.FullDoiResponse) models.Paper {
	return models.Paper{
		Doi: doiResponse.Message.Doi,
	}
}
