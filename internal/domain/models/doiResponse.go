package models

type FullDoiResponse struct {
	Message DoiMessage
}

type DoiMessage struct {
	Doi              string
	Type             string
	Title            string
	Author           []Author2
	Publisher        string
	Abstract         string
	CreatedReference string
	Published        Published
	URL              string
}

type Published struct {
	DateParts [][]int `json:"date-parts"`
}

type Author2 struct {
	Given    string
	Family   string
	Sequence string
}
