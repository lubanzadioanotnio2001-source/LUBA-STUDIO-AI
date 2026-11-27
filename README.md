# LUBA STUDIO AI — edição cloud starter

## Ativar contas e projetos cloud
1. Cria um projeto em Supabase.
2. Abre SQL Editor e executa `supabase/setup.sql`.
3. Copia `public/config.example.js` para `public/config.js`.
4. Preenche URL e publishable key do Supabase. Nunca uses a `service_role` no browser.
5. Em Authentication, configura os URLs permitidos e email confirmation conforme necessário.

A autenticação email/password e a gravação dos metadados do projeto estão ligadas ao Supabase. O esquema inclui bucket privado e políticas RLS para os ficheiros do utilizador. O upload de media na interface ainda precisa de ser ligado ao bucket na próxima implementação; os ficheiros locais não são enviados automaticamente.

## Executar
Node.js 18+
```sh
npm install
cp .env.example .env
# inserir OPENAI_API_KEY no .env para IA generativa
npm start
```
Abrir http://localhost:3000

## Publicar
Publica como serviço Node.js num host com HTTPS (Render, Railway, Fly.io ou VPS). Define `OPENAI_API_KEY`, `OPENAI_MODEL` e `PORT` como variáveis secretas. Publica `public/config.js` com URL/chave anon do Supabase.

## Estado real desta entrega
- Interface responsiva, importação e preview local, faixas básicas e exportação WebM de um único vídeo.
- Autenticação Supabase e gravação dos metadados do projeto após configuração.
- Endpoint IA pronto para chave OpenAI no servidor.
- SQL de projetos, bucket privado e políticas de segurança preparado.
- Ainda não é editor multifaixa profissional completo: renderização de múltiplas camadas, upload cloud efetivo, biblioteca de projetos, recuperação de projetos, transcodificação FFmpeg para MP4/MOV/AVI/MKV/GIF, pagamentos e monitorização precisam de implementação e credenciais/infraestrutura.
