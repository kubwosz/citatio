package models

type Paper struct {
	Doi       string
	Year      int
	Title     string
	Authors   []Author
	Publisher string
	Abstract  string
	Link      string
}

type Author struct {
	Name     string
	Surname  string
	Sequence string
}
