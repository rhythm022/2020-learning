package map_ext_test

import "testing"

func TestMapWithFunc(t *testing.T) {
	m1 := map[int]func(op int) int{}
	m1[1] = func(op int) int { return op }
	m1[2] = func(op int) int { return op * op }

	t.Log(
		m1[1](2),
		m1[2](2),
	)
}

func TestMapSet(t *testing.T) {
	m1 := map[int]bool{}
	m1[1] = true
	t.Log(len(m1))
	//if m1[1] {
	//	t.Log("Have")
	//} else {
	//	t.Log("not have")
	//
	//}

	delete(m1, 1)
	t.Log(len(m1))

}
