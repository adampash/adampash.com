ExUnit.start

Mix.Task.run "ecto.create", ~w(-r AdamPash.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r AdamPash.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(AdamPash.Repo)

