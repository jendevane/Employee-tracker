USE emptr;
INSERT INTO department (namee)
VALUES 
('Sales'),
('HR'),
('IT'),
('Finance');

INSERT INTO rolee (title,salary,department_id)
VALUES 
('Sales Manager', 120000, 1),
('Sales Person', 80000, 1),

('Selector', 70000, 2),
('Trainer', 50000, 2),
('HR Director', 100000,2),

('IT Project Manager', 80000, 3),
('IT Director', 90000, 3),

('Account Manager', 60000, 4),
('Accountant', 60000,4);

INSERT INTO employee (first_name,last_name,rolee_id,manager_id)
VALUES
('Jennifer', 'Devane', 1, NULL ),
('Jessica', 'Devane', 2, 1),
('Sean', 'Cadwell', 3,5),
('Sarah', 'Smith',4, 5),
('Jill', 'Ryan', 5, NULL),
('Mike', 'Staketti', 6, 7),
('Doug', 'Gerberick',7, NULL),
('Joe', 'Shmoe', 8, NULL),
('Kyle','Bradford',9,8);
