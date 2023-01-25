INSERT INTO urls (url, session_id) 
  VALUES ('example1', 'NeXmcoAMXeFMI_G7zADIonZwoPovvuTF'),
    ('example2', 'NeXmcoAMXeFMI_G7zADIonZwoPovvuTF');

INSERT INTO requests (request_nosql_id, method, path, host, session_id, url_id)
  VALUES ('111111', 'GET', '/', 'requestbin.com', 'NeXmcoAMXeFMI_G7zADIonZwoPovvuTF', 3);