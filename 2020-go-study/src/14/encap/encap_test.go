package encap_test

import (
	"fmt"
	"testing"
)

type Employee struct {
	Id    int
	Name  string
	Title string
}

func TestEncap(t *testing.T) {
	//a:=Employee{2,"jw","boss"}

	//a:=Employee{Id:2,Name:"jw"}

	a := new(Employee)
	a.Id = 2
	a.Name = "jw"
	t.Log(a)
	t.Logf("%T", a)
}



func (e Employee) getName() string{
	return fmt.Sprintf("name:%s",e.Name)
}

//func (e *Employee) getName() string{
//	return e.Name
//}

func TestEncap2(t *testing.T) {
	a:=&Employee{2,"jw","boss"}


t.Log(
	a.getName(),
	)
}