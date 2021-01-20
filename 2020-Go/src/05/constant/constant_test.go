package constant_test

import "testing"

//const (
//	one = 1
//	two = 2
//	three = 3
//
//)

const (
	one = iota + 1
	two
	three
)

const (
	Writable = 1 << iota
	Readable
	Executable
)

func TestConstantTry(t *testing.T) {
	t.Log(one, two, three)
	t.Log(Writable, Readable, Executable)
}

func TestConstantTry1(t *testing.T) {
	a := 7 //0111
	b := 1 //0001
	t.Log(
		a&Writable == Writable,
		a&Readable == Readable,
		a&Executable == Executable,
	)
	t.Log(
		b&Writable == Writable,
		b&Readable == Readable,
		b&Executable == Executable,
	)
}
