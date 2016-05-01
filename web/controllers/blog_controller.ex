defmodule AdamPash.BlogController do
  use AdamPash.Web, :controller

  plug :cache

  def show(conn, %{"blog_post" => blog_post}) do
    conn
    |> put_layout(false)
    |> render("#{blog_post}.html")
  end
end
