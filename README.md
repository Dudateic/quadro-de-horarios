# 📅 Quadro de Horários Acadêmico

## 📝 Descrição

Este projeto foi desenvolvido para fins educativos, com o objetivo de ajudar estudantes a organizar seus horários de aulas e matérias de forma prática e visual.

Permite cadastrar matérias e aulas, associando cores personalizadas para melhor identificação, além de oferecer funcionalidades para exportação dos dados em formatos JSON e PDF.

---

## 🚀 Funcionalidades

- 📚 Cadastro de matérias (código, nome, cor personalizada)  
- 🏫 Cadastro de aulas (matéria, professor, dia da semana, horário de início e término)  
- 🎨 Visualização do quadro de horários com cores para cada matéria  
- 📤 Exportação dos dados cadastrados em arquivo JSON  
- 📥 Importação dos dados a partir de arquivo JSON previamente exportado  
- 🖨️ Geração de PDF do quadro de horários em formato paisagem  

---

## 🗂️ Estrutura dos Dados

| Tipo    | Campo              | Exemplo       | Descrição                        |
|---------|--------------------|---------------|---------------------------------|
| 📘 Matéria | Código           | MAT101        | Código identificador da matéria |
| 📘 Matéria | Nome             | Matemática    | Nome completo da matéria        |
| 📘 Matéria | Cor              | #FF5733       | Cor escolhida pelo usuário      |
| 📗 Aula   | Código da matéria | MAT101        | Código da matéria associada     |
| 📗 Aula   | Professor        | João Silva    | Nome do professor               |
| 📗 Aula   | Dia da semana    | Segunda-feira | Dia da aula                    |
| 📗 Aula   | Horário início   | 08:00         | Horário inicial da aula         |
| 📗 Aula   | Horário término  | 09:30         | Horário final da aula           |

---

## ⚙️ Como Usar

1. Abra o arquivo `index.html` no seu navegador.  
2. Comece a cadastrar suas matérias e aulas.  
3. Visualize o quadro de horários montado automaticamente.  
4. Exporte seus dados em JSON para salvar ou compartilhar.  
5. Importe arquivos JSON para continuar a edição posteriormente.  
6. Gere um PDF do quadro completo quando desejar imprimir ou salvar.  

---

## 🛠️ Tecnologias Utilizadas

- HTML5, CSS3 (design responsivo e animações sutis)  
- JavaScript (manipulação de DOM, armazenamento e exportação de dados)  
- Biblioteca para geração de PDF (ex: jsPDF ou similar)  
- JSON para armazenamento e intercâmbio de dados  

---

## ⚠️ Observações

Este projeto é uma ferramenta educativa, ideal para estudantes que desejam organizar seus horários de maneira intuitiva e eficiente.

---

## 📬 Contato

Para dúvidas, sugestões ou contribuições, abra uma issue ou envie um pull request.

---

Obrigado por usar o **Quadro de Horários Acadêmico**! 🎓✨
