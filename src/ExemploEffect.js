import { useState, useEffect } from "react";

export default function UsersList() {
  // Estado para armazenar os usuários
  const [users, setUsers] = useState([]);
  // Estado para gerenciar erro de requisição
  const [error, setError] = useState(null);
  // Estado para mostrar o carregamento
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchUsers = async () => {
      try {
        // Fazendo a requisição à API
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error("Erro ao carregar os usuários");
        }

        // Convertendo a resposta para JSON
        const data = await response.json();

        // Atualizando o estado com os dados dos usuários
        setUsers(data);
      } catch (error) {
        // Se ocorrer algum erro, armazena o erro no estado
        setError(error.message);
      } finally {
        // Após a requisição (independente de sucesso ou erro), definimos o loading como false
        setLoading(false);
      }
    };

    // Chamando a função que faz a requisição
    fetchUsers();
  }, []); // O array vazio [] significa que o useEffect será chamado apenas uma vez, quando o componente for montado

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Usuários</h1>

      {/* Exibição de erro caso haja */}
      {error && <p className="text-red-500">Erro: {error}</p>}

      {/* Exibição de carregamento enquanto os dados não são carregados */}
      {loading && <p>Carregando...</p>}

      {/* Exibição dos dados após o carregamento */}
      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
