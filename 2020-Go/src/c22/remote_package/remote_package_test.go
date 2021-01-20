package remote

import "testing"

import cm "github.com/easierway/concurrent_map"

func TestPackage(t *testing.T) {
	m := cm.CreateConcurrentMap(99)
	m.Set(cm.StrKey("K"), 10)
	t.Log(m.Get(cm.StrKey("K")))
}
