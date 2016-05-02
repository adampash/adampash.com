defmodule AdamPash.Router do
  use AdamPash.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", AdamPash do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/related-widget/build", BlogController, :related
    get ":blog_post", BlogController, :show
  end

  # Other scopes may use custom stacks.
  # scope "/api", AdamPash do
  #   pipe_through :api
  # end
end
