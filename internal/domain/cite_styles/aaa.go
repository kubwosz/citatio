package cite_styles

import (
	"citatio/internal/domain/manipulators"
	"citatio/internal/domain/models"
	"fmt"
)

func GetReferenceAAA(paper models.Paper) (reference string) {
	names := manipulators.GetSurnameAndFirstLetterOfName(paper)

	reference = fmt.Sprintf("%s %v. \"%s\" %s. %v", names, paper.Year, paper.Title, paper.Publisher, paper.Link)
	return
}