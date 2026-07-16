#!/bin/bash

# Script para popular o banco de dados com as curiosidades de Gilmore Girls
# Uso: ./popular-curiosidades.sh

API_URL="http://localhost:3001"
EMAIL="teste@teste.com"
SENHA="123456"

echo "🔑 Fazendo login..."
RESPOSTA_LOGIN=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$SENHA\"}")

TOKEN=$(echo "$RESPOSTA_LOGIN" | grep -o '"access_token":"[^"]*' | sed 's/"access_token":"//')

if [ -z "$TOKEN" ]; then
  echo "❌ Não foi possível pegar o token. Resposta do login:"
  echo "$RESPOSTA_LOGIN"
  exit 1
fi

echo "✅ Token obtido com sucesso!"
echo ""

criar_curiosidade() {
  local texto="$1"
  echo "📝 Criando curiosidade..."

  curl -s -X POST "$API_URL/curiosidades" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"texto\":\"$texto\"}" \
    | grep -o '"id":[0-9]*'

  echo ""
}

criar_curiosidade "☕ A produção gastava mais de \$1.000 por semana apenas em copos de café vazios para usar como props."
criar_curiosidade "📺 Lauren Graham e Alexis Bledel se tornaram amigas reais durante as filmagens e mantêm a amizade até hoje."
criar_curiosidade "🏆 Gilmore Girls ganhou o prêmio de melhor drama do Television Critics Association em 2002."
criar_curiosidade "📖 Amy Sherman-Palladino disse que as 'quatro últimas palavras' da série foram planejadas antes mesmo do piloto ser filmado."
criar_curiosidade "🎬 Edward Herrmann (Richard Gilmore) era fã apaixonado de Rory na vida real e adorava os livros que ela lia na série."
criar_curiosidade "🌿 O jardim de Luke foi plantado e cuidado por uma equipe de jardinagem que trabalhava nos dias de folga das filmagens."
criar_curiosidade "☕ Existem cafés temáticos de Gilmore Girls ao redor do mundo."
criar_curiosidade "📚 A lista de livros de Rory Gilmore virou um desafio para os fãs."
criar_curiosidade "🎭 Kelly Bishop (Emily) ganhou um Tony Award antes de atuar na série."
criar_curiosidade "👩‍❤️‍💋‍👨 Milo Ventimiglia e Alexis Bledel namoraram na vida real."
criar_curiosidade "🧔‍♂️ O pai de Lane nunca apareceu na série."
criar_curiosidade "👩‍🎤 Carole King interpreta Sophie na série."
criar_curiosidade "Sookie seria lésbica no roteiro original."

echo "🎉 Concluído! Todas as curiosidades foram enviadas."
echo "Confira em: $API_URL/curiosidades"
