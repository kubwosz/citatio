package manipulators

import (
	"citatio/internal/domain/models"
	"fmt"
	"strings"
)

func GetSurnameAndFirstLetterOfName(paper models.Paper) (names string) {
	for _, element := range paper.Authors {
		names += fmt.Sprintf("%s %c., ", element.Surname, element.Name[0])
	}

	names = strings.TrimSuffix(names, ", ")
	return
}
