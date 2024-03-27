package cite_styles

import (
	"citatio/internal/domain/manipulators"
	"citatio/internal/domain/models"
	"fmt"
)

func (p ReferenceSource) ASA(paper models.Paper) (reference string) {
	names := manipulators.GetOnlySurname(paper, ", ")

	reference = fmt.Sprintf("%s %v. \"%s\" %s. %v", names, paper.Year, paper.Title, paper.Publisher, paper.Doi)
	return
}
