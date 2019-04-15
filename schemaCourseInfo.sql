USE test;
DROP TABLE IF EXISTS Courses3;
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
