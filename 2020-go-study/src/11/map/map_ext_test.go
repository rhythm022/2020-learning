package string_test

import (
	"strconv"
	"strings"
	"testing"
)

func TestString(t *testing.T) {
	var s string
	s = "hello中国"
	t.Log(len(s))
	s = "\xE4\xB8\xA5"
	t.Log(s, len(s))
}

func TestString2(t *testing.T) {
	var s string
	s = "中g国"

	c := []rune(s)

	t.Log(c, len(c))
}

func TestString3(t *testing.T) {
	var s string
	s = "中g国"

	for _, c := range s {
		t.Logf("%[1]c %[1]x %[1]d", c)
	}
}


func TestString4(t *testing.T) {
	var s string
	s = "中,g,国"

	a:= strings.Split(s,",")
	for _, part := range a {
		t.Log(part)
	}

	t.Log(strings.Join(a,"-"))
}


func TestStringConv(t *testing.T) {
	t.Log("str"+strconv.Itoa(190))



	if a,err := strconv.Atoi("190");err == nil{
		t.Log(10 + a)

	}
}