package cite_styles

import (
	"citatio/internal/domain/manipulators"
	"citatio/internal/domain/models"
	"fmt"
)

func (p ReferenceSource) AAA(paper models.Paper) (reference string) {
	names := manipulators.GetSurnameAndFirstLetterOfName(paper)

	reference = fmt.Sprintf("%s %v. \"%s\" %s. %v", names, paper.Year, paper.Title, paper.Publisher, paper.Link)
	return
}

func (p ReferenceSource) BBB(paper models.Paper) (reference string) {
	fmt.Println("hello")
	names := manipulators.GetSurnameAndFirstLetterOfName(paper)

	reference = "" + names
	return
}
