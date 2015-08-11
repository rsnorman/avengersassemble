module ApplicationHelper

  def react_props(props)
    templates = {}
    dup_props = props.dup
    props.each_pair do |key, value|
      if value.is_a?(Hash) && value.key?(:template)
        templates[key] = dup_props[key]
        dup_props[key] = "__#{key.to_s.upcase}_TEMPLATE__"
      end
    end

    props_json = dup_props.to_json

    templates.each_pair do |key, value|
      props_json = props_json.gsub(
        "\"__#{key.to_s.upcase}_TEMPLATE__\"",
        render(template: "/api/v1/#{value[:template]}", locals: value[:locals])
      )
    end

    props_json
  end
end
