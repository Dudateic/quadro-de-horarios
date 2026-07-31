let dadosAgenda = { materias: {}, aulas: [] };
const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

document.getElementById('inputCorMateria').addEventListener('input', (e) => 
  document.getElementById('visualizacaoCor').style.backgroundColor = e.target.value
);

function inicializar() {
  const salvo = localStorage.getItem('dadosViveri');
  if(salvo) { dadosAgenda = JSON.parse(salvo); atualizarInterface(); }
  
  const temaSalvo = localStorage.getItem('temaPreferido');
  if(temaSalvo === 'escuro') document.body.classList.add('modo-escuro');
}

window.onload = inicializar;

function alternarTema() {
  document.body.classList.toggle('modo-escuro');
  localStorage.setItem('temaPreferido', document.body.classList.contains('modo-escuro') ? 'escuro' : 'claro');
}

function salvarDados() { 
  localStorage.setItem('dadosViveri', JSON.stringify(dadosAgenda)); 
  atualizarInterface(); 
}

function notificar(mensagem) { 
  const toast = document.getElementById('toast'); 
  toast.textContent = mensagem; 
  toast.classList.add('visivel'); 
  setTimeout(() => toast.classList.remove('visivel'), 2500); 
}

function adicionarMateria() {
  const nome = document.getElementById('inputNomeMateria').value.trim();
  const cor = document.getElementById('inputCorMateria').value;
  
  if(!nome) return notificar('Digite o nome da matéria');
  
  dadosAgenda.materias[nome] = { cor };
  document.getElementById('inputNomeMateria').value = '';
  
  salvarDados(); 
  notificar('Matéria criada com sucesso!');
}

function agendarAula() {
  const materia = document.getElementById('selectMateria').value;
  const dia = document.getElementById('selectDia').value;
  const inicio = document.getElementById('inputInicio').value;
  const fim = document.getElementById('inputFim').value;

  if(!materia || !inicio || !fim) return notificar('Preencha todos os campos');
  if(inicio >= fim) return notificar('Horário final deve ser maior que o inicial');

  dadosAgenda.aulas.push({ id: Date.now(), materia, dia, inicio, fim });
  salvarDados(); 
  notificar('Aula agendada!');
}

function atualizarInterface() {
  const select = document.getElementById('selectMateria');
  select.innerHTML = '<option value="">Selecione...</option>';
  Object.keys(dadosAgenda.materias).forEach(nome => {
      const opt = document.createElement('option');
      opt.value = nome;
      opt.textContent = nome;
      select.appendChild(opt);
  });

  const containerLegenda = document.getElementById('containerLegenda');
  containerLegenda.innerHTML = '';
  Object.entries(dadosAgenda.materias).forEach(([nome, props]) => {
    containerLegenda.innerHTML += `
        <div style="font-size:0.85rem; display:flex; align-items:center; gap:6px; background:var(--cor-input); padding:6px 12px; border-radius:20px;">
            <div style="width:12px;height:12px;border-radius:50%;background:${props.cor}"></div>
            ${nome}
        </div>`;
  });

  const corpoTabela = document.getElementById('corpoTabela');
  corpoTabela.innerHTML = '';
  
  let horarios = new Set(); 
  dadosAgenda.aulas.forEach(a => { horarios.add(a.inicio); horarios.add(a.fim); });
  let horariosOrdenados = Array.from(horarios).sort();

  if (horariosOrdenados.length === 0) {
      corpoTabela.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--cor-texto-sec)">O quadro está vazio. Adicione matérias e aulas!</td></tr>';
      return;
  }

  for(let i=0; i<horariosOrdenados.length-1; i++) {
    const linha = document.createElement('tr');
    const horaInicio = horariosOrdenados[i];
    const horaFim = horariosOrdenados[i+1];
    
    linha.innerHTML = `<td>${horaInicio} - ${horaFim}</td>`;
    
    diasSemana.forEach(dia => {
      const celula = document.createElement('td');
      const aulaEncontrada = dadosAgenda.aulas.find(a => a.dia === dia && a.inicio < horaFim && a.fim > horaInicio);
      
      if(aulaEncontrada && aulaEncontrada.inicio === horaInicio) {
         let extensaoLinhas = 0;
         for(let j=i; j<horariosOrdenados.length-1; j++) {
           if(horariosOrdenados[j+1] <= aulaEncontrada.fim) extensaoLinhas++; else break;
         }
         celula.rowSpan = extensaoLinhas;
         celula.innerHTML = `
            <div class="bloco-aula" onclick="abrirModal(${aulaEncontrada.id})" style="background:${dadosAgenda.materias[aulaEncontrada.materia].cor}">
                ${aulaEncontrada.materia}
            </div>`;
         linha.appendChild(celula);
      } else if (!aulaEncontrada) {
         linha.appendChild(celula);
      }
    });
    corpoTabela.appendChild(linha);
  }
}

function abrirModal(id) {
  const aula = dadosAgenda.aulas.find(x => x.id === id);
  document.getElementById('tituloModal').textContent = aula.materia;
  document.getElementById('descricaoModal').innerHTML = `<strong>Dia:</strong> ${aula.dia}<br><strong>Horário:</strong> ${aula.inicio} às ${aula.fim}`;
  document.getElementById('idAulaSelecionada').value = id;
  document.getElementById('modalEdicao').style.display = 'flex';
}

function fecharModal() { document.getElementById('modalEdicao').style.display = 'none'; }

function excluirAula() {
  const id = Number(document.getElementById('idAulaSelecionada').value);
  dadosAgenda.aulas = dadosAgenda.aulas.filter(a => a.id !== id);
  fecharModal(); 
  salvarDados(); 
  notificar('Aula removida');
}

function limparTudo() { 
    if(confirm('Tem certeza que deseja apagar todo o planejamento?')) { 
        dadosAgenda={materias:{},aulas:[]}; 
        salvarDados(); 
        notificar('Tudo limpo!');
    } 
}

function exportarJSON() {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([JSON.stringify(dadosAgenda)],{type:'application/json'}));
  link.download = 'backup_plan.json'; 
  link.click();
}

function importarJSON(input) {
  const leitor = new FileReader();
  leitor.onload = (e) => { 
      try {
        dadosAgenda = JSON.parse(e.target.result); 
        salvarDados(); 
        notificar('Dados restaurados com sucesso!'); 
      } catch(err) { notificar('Erro no arquivo'); }
  };
  leitor.readAsText(input.files[0]);
}

async function exportarImagem() {
  notificar('Gerando imagem...');
  const canvas = await html2canvas(document.getElementById('areaCaptura'), { scale: 2, backgroundColor: window.getComputedStyle(document.body).backgroundColor });
  const link = document.createElement('a'); 
  link.href=canvas.toDataURL(); 
  link.download='meu_horario.png'; 
  link.click();
}

function exportarPDF() {
  const { jsPDF } = window.jspdf; 
  const doc = new jsPDF('l','pt','a4');
  doc.text('Meu Planejamento', 40, 40);
  doc.autoTable({ html: '#tabelaPrincipal', startY: 60, theme:'grid' }); 
  doc.save('horario_plan.pdf');
}