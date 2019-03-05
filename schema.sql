USE test;
DROP TABLE IF EXISTS Courses1;
DROP TABLE IF EXISTS Courses2;
CREATE TABLE Courses1 (
    YEAR INTEGER,
    CRN INTEGER,
    CourseSubject TEXT,
    CourseNumber INTEGER,
    CourseTitle TEXT,
    CourseSection TEXT,
    SchedType VARCHAR(255),
    Term TEXT,
    Instructor TEXT,
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
    AverageGrade FLOAT,
    StandardDeviation FLOAT,
    PercentFullScore INT,
    PRIMARY KEY (CRN,YEAR,SchedType) 
);
-- COMMIT;