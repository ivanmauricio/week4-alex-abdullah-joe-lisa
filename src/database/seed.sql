BEGIN;

INSERT INTO users VALUES
  (1, 'Ben', 'a@example.com', '$2a$12$A74tKw96m82AEZpJrIEQxecZGscKayJD/hD5/I6DuqKEJoQlAlNYO', '2017-12-25 00:00:00'),
  (2, 'Sara', 'b@example.com', '$2a$12$o2NP8ykiki.T11qRQOCnBeX68PhwXHprM/hxHkbAfqotWo2XT.vdW', '2017-12-25 00:00:00'),
  (3, 'Bea', 'c@example.com', '$2a$12$8HIQ9kqN0brBUfDigfSfB.9BlSsICw4LQ/tiw4U/zMW5QWtuTqMG6', '2017-12-25 00:00:00'),
  (4, 'Fin', 'd@example.com', '$2a$12$vpUb03L0WVHMfrHducL2SumogekzuPfh9Ych0Il8Zkt5Baqch7QZq', '2017-12-25 00:00:00')
ON CONFLICT DO NOTHING;

INSERT INTO pets VALUES
  (1, 'Milo', 2, 'dog', '../uploads/dog', 1),
  (2, 'Cupcake', 4, 'dolphin', '../uploads/dolphin', 1),
  (3, 'Bao', 1, 'cat', '../uploads/cat', 0),
  (4, 'Amber', 4, 'eagle', '../uploads/eagle', 0),
  (5, 'Mittens', 4, 'tiger', '../uploads/tiger', 0),
  (6, 'Dumpling', 1, 'snake', '../uploads/snake', 0)
ON CONFLICT DO NOTHING;

COMMIT;