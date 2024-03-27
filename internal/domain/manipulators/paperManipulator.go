package manipulators

import (
	"citatio/internal/domain/models"
	"fmt"
	"strings"
)

func GetSurnameAndFirstLetterOfName(paper models.Paper, connector string) (names string) {
	for _, element := range paper.Authors {
		names += fmt.Sprintf("%s %c."+connector, element.Surname, element.Name[0])
	}

	names = strings.TrimSuffix(names, connector)
	return
}

func GetOnlySurname(paper models.Paper, connector string) (names string) {
	for _, element := range paper.Authors {
		names += fmt.Sprintf("%s"+connector, element.Surname)
	}

	names = strings.TrimSuffix(names, connector)
	return
}
