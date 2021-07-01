-- name your database koala_database


-- run this statement to create the koalas table on your database 

CREATE TABLE koalas (
	"id" serial PRIMARY KEY,
	"name" varchar(20),
	"age" varchar(3),
	"gender" varchar(10),
	"readyForTransfer" varchar(10),
	"notes" varchar(250)
);

-- run this statement to populate the table with the starting koala data
INSERT INTO koalas ("name", "gender", "age", "readyForTransfer", "notes")
	VALUES ('Scotty', 'M', '4', 'Y', 'Born in Guatemala'),
	('Jean', 'F', '5', 'Y', 'Allergic to lots of lava'),
	('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)'),
	('Logan', 'M', '15', 'N', 'Loves the sauna'),
	('Charlie', 'M', '9', 'Y', 'Favorite band is Nirvana'),
	('Betsy', 'F', '4', 'Y', 'Has a pet iguana');

-- run this statement to view all koalas on the koalas table
SELECT *
FROM koalas;

