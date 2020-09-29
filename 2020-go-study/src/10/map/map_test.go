package map_test

import "testing"

func TestInitMap(t *testing.T){
	m1:=map[int]int{1:1,2:3,3:2}
m2:=make(map[int]int,100)
m2[4] = 1
	t.Logf("len(m1)=%d len(m2)=%d ",len(m1),len(m2))
}


func TestAccess(t *testing.T){
	m2 := make(map[int]int, 100)
	a := m2[2]

	t.Log(a)
	m2[2] = 0
	if v,ok := m2[2];ok{
		t.Logf("m2[2] is %d",v)
	}else{
		t.Log("m2[2] is not existed")
	}
}

func TestTravel(t *testing.T){
	m2 := map[int]int{
		1:1,
		54:2,
		78:3,
	}

for k,i := range m2{
	t.Log(k,i)
}
}