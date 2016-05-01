defmodule AdamPash.PageController do
  use AdamPash.Web, :controller

  plug :cache

  def index(conn, _params) do
    render conn, "index.html"
  end
end
