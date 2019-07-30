package main

import (

	// Why do we need this package?

	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error

type User struct {
	ID        uint   `json:"id"`
	Firstname string `json:"firstname"`
	Username  string `json:"username"`
	Password  string `json:"password"`
}

type Genre struct {
	Gid   uint   `json:"id" gorm:"primary_key;AUTO_INCREMENT;default:'1'" `
	Gname string `json:"gname"`
}

type Quiz struct {
	Qzid   uint   `json:"id" gorm:"primary_key;AUTO_INCREMENT;default:'1'" `
	Qzname string `json:"qzname"`
	Gid    uint   `json:"gid"`
}

type Questions struct {
	Qid   uint   `json:"id" gorm:"primary_key;AUTO_INCREMENT;default:'1'"`
	Qbody string `json:"qbody"`
	Qzid  uint   `json:"qzid"`
	Opa   string `json:"opa"`
	Opb   string `json:"opb"`
	Opc   string `json:"opc"`
	Crt   string `json:"crt"`
	Img   string `json:"img"`
	Snd   string `json:"snd"`
}

type Score struct {
	Username string `json:"username"`
	Qzid     uint   `json:"qzid"`
	Scr      int    `json:"scr"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	db.LogMode(true)
	defer db.Close()
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Genre{})
	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&Questions{})
	db.AutoMigrate(&Score{})

	r := gin.Default()

	r.GET("/genre/", ViewGen)
	r.GET("/people/", GetPeople)
	r.GET("/quiz/", ViewQuiz)
	r.GET("/quiz/:id", GenQuiz)
	r.GET("/leader/", GetLeader)
	r.GET("/leader/:id", QuizLeader)
	r.POST("/signup", CreateUser)
	r.POST("/login", CheckLogIn)
	r.POST("/genre", AddGen)
	r.POST("/quiz", AddQuiz)
	r.POST("/ques", AddQues)
	r.POST("/score", UpdateScore)
	r.DELETE("/people/:id", DeletePerson)
	r.DELETE("/quiz/:id", DeleteQuiz)

	r.PUT("/ques/:id", UpdateQues)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func CreateUser(c *gin.Context) {
	var person User
	c.BindJSON(&person)
	db.Create(&person)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, person)
}

func DeletePerson(c *gin.Context) {
	fmt.Println("dsasdadsa")
	id := c.Params.ByName("id")
	var person User
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func CheckLogIn(c *gin.Context) {
	var result []User
	var usr User
	c.BindJSON(&usr)
	fmt.Println(usr.Username, usr.Password)

	if err := db.Where("username = ? AND password = ?", usr.Username, usr.Password).Find(&result).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(len(result))
		c.Header("access-control-allow-origin", "*")
		if len(result) > 0 {
			c.JSON(200, result)
		} else {
			c.JSON(404, result)
		}
	}
}

func AddGen(c *gin.Context) {
	var gen Genre
	c.BindJSON(&gen)
	db.Create(&gen)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gen)
}

func ViewGen(c *gin.Context) {
	var gen []Genre
	if err := db.Find(&gen).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gen)
	}
}

func AddQuiz(c *gin.Context) {

	var qz Quiz
	c.BindJSON(&qz)
	fmt.Println(qz.Qzname, qz.Gid)
	db.Create(&qz)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, qz)
}

func ViewQuiz(c *gin.Context) {
	type Temp struct {
		Qzid   uint   `json:"id"`
		Qzname string `json:"qzname"`
		Gname  string `json:"gname"`
		Gid    string `json:"gid"`
	}
	var tmp []Temp
	if err := db.Table("quizzes").Select("qzid,qzname,gname,genres.gid").Joins("join genres on quizzes.gid = genres.gid").Find(&tmp).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, tmp)
	}

}

func DeleteQuiz(c *gin.Context) {
	fmt.Println("dsasdadsa")
	id := c.Params.ByName("id")
	var qui Quiz
	var que Questions
	d := db.Where("qzid = ?", id).Delete(&qui)
	s := db.Table("questions").Where("qzid = ?", id).Delete(&que)
	fmt.Println(d, s)

	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func AddQues(c *gin.Context) {
	var que Questions
	c.BindJSON(&que)
	db.Create(&que)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, que)
}

func UpdateQues(c *gin.Context) {
	var ques Questions
	id := c.Params.ByName("id")
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented

	if err := db.Where("id = ?", id).First(&ques).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&ques)
	db.Save(&ques)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, ques)
}

func GenQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var que []Questions
	if err := db.Where("qzid=?", id).Find(&que).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, que)
	}
}

func GetPeople(c *gin.Context) {
	fmt.Println("hello")
	var people []User
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, people)
	}
}

func UpdateScore(c *gin.Context) {
	var scr Score
	c.BindJSON(&scr)
	c.Header("access-control-allow-origin", "*")
	if err := db.Create(&scr).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, scr)
	}

}

func GetLeader(c *gin.Context) {
	var scr []Score
	if err := db.Select("username,qzid,sum(scr) as scr").Group("username").Order("scr desc").Find(&scr).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, scr)
	}
}

func QuizLeader(c *gin.Context) {

	id := c.Params.ByName("id")
	var scr []Score
	if err := db.Where("scores.qzid=?", id).Order("scr desc").Find(&scr).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, scr)
	}
}
