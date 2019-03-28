USE test;
DROP TABLE IF EXISTS Courses2;
CREATE TABLE Courses2 (
    CourseID INTEGER,
    YEAR INTEGER,
    Term TEXT,
    YearTerm VARCHAR(255),
    CourseSubject VARCHAR(255),
    CourseNumber INTEGER,
    CourseTitle TEXT,
    Aplus INTEGER,
    A INTEGER,
    Aminus INTEGER,
    Bplus INTEGER,
    B INTEGER,
    Bminus INTEGER,
    Cplus INTEGER,
    C INTEGER,
    Cminus INTEGER,
    Dplus INTEGER,
    D INTEGER,
    Dminus INTEGER,
    F INTEGER,
    W INTEGER,
    Instructor VARCHAR(255),
    PRIMARY KEY (CourseID) 
)