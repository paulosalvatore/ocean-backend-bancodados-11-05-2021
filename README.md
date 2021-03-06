# ocean-backend-bancodados-11-05-2021

## Download

- **Para rodar Node na sua máquina:** https://nodejs.org/en/download/
- **VSCode - Editor de Códigos (IDE)** https://code.visualstudio.com/download
- **Postman** - Para testar requisições Rest (existem vários outros) - Também pode ser o Insomnia ou a versão Web do Postman, mas recomendo para seguir a aula usar o Postman instalado no PC https://www.postman.com/downloads/
- **JSON Viewer** (Extensão chrome) - Opcional https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=pt-BR

- **Mongo DB Community:** https://www.mongodb.com/try/download/community
  - Se for Windows 7, baixa a versão 4.2.14

## Tópicos

- O que é banco de dados?

- Diferença entre SQL e NoSQL

- Um overview sobre os principais sistemas de gerenciamento de banco de dados SQL e NoSQL

  - **SQL:** MySQL, MariaDB, PostgreSQL, SQL Server, Oracle DB
  - **NoSQL:** MongoDB, Cassandra, DynamoDB, Firebase Realtime Database, Redis, Neo4j

- Query Languages (Linguagens de consulta)
- Apresentação dos softwares para utilização do MongoDB: Mongo Compass ou NoSQLBooster
- Criação da base de dados
- Explicação e Criação da collection
- Entendendo a query language do MongoDB
- Realizando operações simples (inserção, consulta, atualização e remoção) na base de dados
- Integração do MongoDB com o NodeJS utilizando a própria biblioteca do MongoDB
- Substituição das funções de backend desenvolvidas nas aulas anteriores para integrar o CRUD com a base de dados

## O que é banco de dados?

Tecnologias para armazenar e manipular informações.

Database Ranking: https://db-engines.com/en/ranking

### SQL

- Informações são armazenadas em `Tables`
- A estrutura das `Tables` é definida pelo `Schema`
- `Tables` possuem registros que seguem esse mesmo `Schema`

**Pessoas**

- id (Primary Key - Chave Primária)
- nome (string - varchar(255))

**Cachorros**

- id (Primary Key - Chave Primária)
- nome (string - varchar(255))
- pessoa_id (FK/Foreign Key - Chave Estrangeira)

### CRUD

- **Create**

  - ```sql
    INSERT INTO `pessoas` (`id`, `nome`) VALUES (NULL, 'Paulo');
    ```

- **Read**

  - **Read All**

    ```sql
    SELECT * FROM `pessoas`
    ```

  - **Read Single**

    ```sql
    SELECT * FROM `pessoas` WHERE `id` = 1
    ```

- **Update**

  - ```sql
    UPDATE `pessoas` SET `nome` = 'Paulo Salvatore' WHERE `pessoas`.`id` = 1;
    ```

- **Delete**

  - ```sql
    DELETE FROM `pessoas` WHERE `pessoas`.`id` = 2
    ```

- **Criação de Foreign Key**

  - ```sql
    ALTER TABLE cachorros
    ADD FOREIGN KEY (pessoa_id) REFERENCES pessoas(id);
    ```

## SQL vs NoSQL

**SQL:** Modelo relacional

**NoSQL:** Not-only relacional

### MongoDB

- `Tables` do MySQL viram as `Collections`
- `Collections` armazenam documentos em `JSON`
- Esses documentos não precisam seguir um `Schema`, por tanto, as `collections` são `schema-less`. Isso significa que os documentos de uma `collection` não precisam respeitar a mesma estrutura.
- Uma grande vantagem do `MongoDB` é que ele permite a realização de consultas dentro dos documentos.

**Pessoas**

- _id (ObjectId - Index)
- nome (string)

**Cachorros**

- id (ObjectId - Index)
- nome (string)
- pessoa_id (ObjectId)

### CRUD

- **Create**

  - ```javascript
    db.collection.insert({ nome: "Paulo Salvatore" })
    ```

- **Read**

  - **Read All**

    ```javascript
    db.collection.find({})
    ```

  - **Read Single**

    ```javascript
    db.collection.find({ _id: ObjectId('hash') })
    ```

- **Update**

  - ```sql
    db.collection.update(
    	{ _id: ObjectId('hash') },
        {
        	$set: { nome: 'Paulo' }
        }
    )
    ```

- **Delete**

  - ```javascript
    db.collection.deleteOne({ _id: ObjectId('hash') })
    ```