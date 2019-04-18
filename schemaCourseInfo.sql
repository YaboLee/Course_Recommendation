USE test;
DROP TABLE IF EXISTS Courses3;
DROP TABLE IF EXISTS CourseComment;
DROP TABLE IF EXISTS Interests;
CREATE TABLE Courses3(
    id INTEGER AUTO_INCREMENT,
    CourseSubject VARCHAR(255),
    CourseNumber INTEGER,
    CourseTitle TEXT,
    Instructor VARCHAR(255),
    LIKES INTEGER(255) DEFAULT 0,
    PRIMARY KEY (id)
);
INSERT INTO Courses3 (CourseSubject,CourseNumber,CourseTitle,Instructor)
SELECT DISTINCT CourseSubject, CourseNumber, CourseTitle, Instructor
FROM Courses2;
CREATE TABLE CourseComment(
    id INTEGER AUTO_INCREMENT,
    Username VARCHAR(255),
    CourseSubject VARCHAR(255),
    CourseNumber INTEGER,
    Instructor VARCHAR(255),
    CourseComment TEXT,
    Sentiment INTEGER,
    PRIMARY KEY (id)
);
CREATE TABLE Interests(
    id INTEGER AUTO_INCREMENT,
    Username VARCHAR(255),
    CourseSubject VARCHAR(255),
    CourseNumber INTEGER,
    Instructor VARCHAR(255),
    PRIMARY KEY (id)
);

