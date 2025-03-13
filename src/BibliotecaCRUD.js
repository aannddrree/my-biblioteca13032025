import { useState, useEffect } from "react";

export default function BibliotecaCRUD() {
  const [bibliotecas, setBibliotecas] = useState([]);
  const [livro, setLivro] = useState({ nome: "", autor: "", qtdPaginas: "", tipo: "" });
  const [dataCadastro, setDataCadastro] = useState("");
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/projeto/api/v1/biblioteca")
      .then((res) => res.json())
      .then((data) => setBibliotecas(data));
  }, []);

  const handleSubmit = async () => {
    const novaBiblioteca = { livro, dataCadastro };
    const method = editando ? "PUT" : "POST";
    const url = "http://localhost:8081/projeto/api/v1/biblioteca";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaBiblioteca),
    });

    if (response.ok) {
      setBibliotecas(editando ? bibliotecas.map(b => (b.id === editando ? novaBiblioteca : b)) : [...bibliotecas, novaBiblioteca]);
      setEditando(null);
    }
  };

  const handleEdit = (biblio) => {
    setLivro(biblio.livro);
    setDataCadastro(biblio.dataCadastro);
    setEditando(biblio.id);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8081/projeto/api/v1/biblioteca/${id}`, { method: "DELETE" });
    if (response.ok) {
      setBibliotecas(bibliotecas.filter(b => b.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">📚 Gerenciamento de Biblioteca</h1>

      {/* Formulário */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input className="p-2 border rounded-lg" placeholder="Nome do Livro" value={livro.nome} onChange={(e) => setLivro({ ...livro, nome: e.target.value })} />
          <input className="p-2 border rounded-lg" placeholder="Autor" value={livro.autor} onChange={(e) => setLivro({ ...livro, autor: e.target.value })} />
          <input className="p-2 border rounded-lg" type="number" placeholder="Qtd. Páginas" value={livro.qtdPaginas} onChange={(e) => setLivro({ ...livro, qtdPaginas: parseInt(e.target.value) })} />
          <input className="p-2 border rounded-lg" placeholder="Tipo" value={livro.tipo} onChange={(e) => setLivro({ ...livro, tipo: e.target.value })} />
          <input className="p-2 border rounded-lg col-span-2" type="date" value={dataCadastro} onChange={(e) => setDataCadastro(e.target.value)} />
        </div>
        <button onClick={handleSubmit} className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
          {editando ? "Atualizar Livro" : "Adicionar Livro"}
        </button>
      </div>

      {/* Tabela */}
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Autor</th>
            <th className="p-3">Páginas</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Data Cadastro</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {bibliotecas.map((biblio, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="p-3">{biblio.livro.nome}</td>
              <td className="p-3">{biblio.livro.autor}</td>
              <td className="p-3">{biblio.livro.qtdPaginas}</td>
              <td className="p-3">{biblio.livro.tipo}</td>
              <td className="p-3">{biblio.dataCadastro}</td>
              <td className="p-3 flex space-x-2">
                <button onClick={() => handleEdit(biblio)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">✏️</button>
                <button onClick={() => handleDelete(biblio.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
