package cite_styles

import (
	"citatio/internal/domain/manipulators"
	"fmt"
)

func (p ReferenceSource) AAA() (reference string) {
	names := manipulators.GetSurnameAndFirstLetterOfName(p.Paper)

	reference = fmt.Sprintf("%s %v. \"%s\" %s. %v", names, p.Paper.Year, p.Paper.Title, p.Paper.Publisher, p.Paper.Link)
	return
}
