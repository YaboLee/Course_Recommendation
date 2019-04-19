package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/googollee/go-socket.io"
)

type customServer struct {
	Server *socketio.Server
}

func (s *customServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	origin := r.Header.Get("Origin")
	w.Header().Set("Access-Control-Allow-Origin", origin)
	s.Server.ServeHTTP(w, r)
}

func configureSocketIO() *socketio.Server {
	// server, err := socketio.NewServer(nil)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}
	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})
	server.OnEvent("/", "notice", func(s socketio.Conn, msg string) {
		fmt.Println("notice:", msg)
		s.Emit("reply", "have "+msg)
	})
	server.OnEvent("/chat", "msg", func(s socketio.Conn, msg string) string {
		s.SetContext(msg)
		return "recv " + msg
	})
	server.OnEvent("/", "bye", func(s socketio.Conn) string {
		last := s.Context().(string)
		s.Emit("bye", last)
		s.Close()
		return last
	})
	server.OnError("/", func(e error) {
		fmt.Println("meet error:", e)
	})
	server.OnDisconnect("/", func(s socketio.Conn, msg string) {
		fmt.Println("closed", msg)
	})
	// go server.Serve()
	// defer server.Close()
	return server

	// //Client connects to server
	// server.On("connection", func(so socketio.Socket) {

	// 	//What will happen as soon as the connection is established:
	// 	so.On("connection", func(msg string) {
	// 		so.Join("clients")
	// 		println(so.Id() + " joined clients.")

	// 		//In case you want to send a custom emit directly after the client connected.
	// 		//If you fire an emit directly after the connection event it won't work therefore you need to wait a bit
	// 		//In this case two seconds.
	// 		ticker := time.NewTicker(2 * time.Second)
	// 		go func() {
	// 			for {
	// 				select {
	// 				case <-ticker.C:
	// 					so.Emit("online", "Do Something!")
	// 					ticker.Stop()
	// 					return
	// 				}
	// 			}
	// 		}()
	// 	})

	// 	//What will happen if clients disconnect
	// 	so.On("disconnection", func() {
	// 		log.Println("on disconnect")
	// 	})

	// 	//Custom event as example
	// 	so.On("hello", func(msg string) {
	// 		log.Println("received request (hello): " + msg)

	// 		so.Emit("Hi", "How can I help you?")
	// 	})
	// })

	// server.On("error", func(so socketio.Socket, err error) {
	// 	log.Println("error:", err)
	// })

	// return server
}

func main() {
	ioServer := configureSocketIO()

	wsServer := new(customServer)
	wsServer.Server = ioServer

	//HTTP settings
	println("Core Service is listening on port 8081...")
	http.Handle("/socket.io/", wsServer)
	http.ListenAndServe(":8000", nil)
	// server, err := socketio.NewServer(nil)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// server.OnConnect("/", func(s socketio.Conn) error {
	// 	s.SetContext("")
	// 	fmt.Println("connected:", s.ID())
	// 	return nil
	// })
	// server.OnEvent("/", "notice", func(s socketio.Conn, msg string) {
	// 	fmt.Println("notice:", msg)
	// 	s.Emit("reply", "have "+msg)
	// })
	// server.OnEvent("/chat", "msg", func(s socketio.Conn, msg string) string {
	// 	s.SetContext(msg)
	// 	return "recv " + msg
	// })
	// server.OnEvent("/", "bye", func(s socketio.Conn) string {
	// 	last := s.Context().(string)
	// 	s.Emit("bye", last)
	// 	s.Close()
	// 	return last
	// })
	// server.OnError("/", func(e error) {
	// 	fmt.Println("meet error:", e)
	// })
	// server.OnDisconnect("/", func(s socketio.Conn, msg string) {
	// 	fmt.Println("closed", msg)
	// })
	// go server.Serve()
	// defer server.Close()

	// http.Handle("/", server)
	// // http.Handle("/", http.FileServer(http.Dir("./asset")))
	// log.Println("Serving at localhost:8000...")
	// log.Fatal(http.ListenAndServe(":8000", nil))
}
