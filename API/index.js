const axios = require("axios");
const express = require("express");
const app = express();

const url = "https://api.github.com/orgs/takenet/repos";

// Defino o destino do get, vou utilizar o "/repositories" para fazer a requisição
app.get("/repositories", async (req, res) => {
    try {
        // Crio uma requisição e um filtro para retornar apenas os repositorios com a linguagem C#
        const { data } = await axios(url);
        const filteredData = data
          .filter((repo) => repo.language === "C#")
          .slice(0, 5);
        const response = {};
    
        // Criar um objeto que armazena dados do repositorio
        let search = 0;
        filteredData.forEach((repo) => {
            // Realizar metodo de busca para pegar nomes, descrição, linguagem e ordem da data de criação do repositório
            response[search] = {
            name: repo.full_name,
            description: repo.description,
            language: repo.language,
            created_at: repo.created_at,
            avatar_url: repo.avatar_url,
          };
          search++;
        });
    
        res.send(response);
      } catch (error) {
        console.log(error);
      }
    });

// Definindo minha porta padrão, caso seja webservice (heroku) = "process.env.PORT" ou localhost a porta será = 5000;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta: ${PORT}`));