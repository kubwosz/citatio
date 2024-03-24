package cite_styles

import (
	"citatio/internal/domain/manipulators"
	"citatio/internal/domain/models"
	"fmt"
)

func (p ReferenceSource) APA() (reference string, paper models.Paper) {
	names := manipulators.GetSurnameAndFirstLetterOfName(paper)

	reference = fmt.Sprintf("%s, (%v). %s. %s. %v", names, paper.Year, paper.Title, paper.Publisher, paper.Link)
	return
}
