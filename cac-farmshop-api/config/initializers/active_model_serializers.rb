ActiveModelSerializers.config.tap do |c|
    c.adapter = :json_api
    c.jsonapi_include_toplevel_object = true
    c.default_includes = '**'
    c.jsonapi_version = "1.0"
  end
  
  #ActiveModelSerializers.config.default_includes = '**'