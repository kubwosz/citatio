package models

type Paper struct {
	Doi       string
	Year      string
	Title     string
	Author    []Author
	Publisher string
	Abstract  string
	Link      string
}

type Author struct {
	Name     string
	Surname  string
	Sequence string
}
