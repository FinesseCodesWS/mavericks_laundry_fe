import { CardLayout } from "../../../components/cards";
import { Button } from "../../../components/elements";

const Templates = ({ defaultTemplates, templates, deleteCustomTemplate, handleTemplateSelect }) => {
  return (
    <div className="row">
                  {defaultTemplates.map((template, index) => (
                    <div
                      style={{ cursor: "pointer" }}
                      className="col-md-4"
                      key={index}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardLayout className="mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{template.title}</h5>
                          <p className="card-text">{template.message}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {template.category}
                            </small>
                          </p>
                        </div>
                      </CardLayout>
                    </div>
                  ))}

                  {templates?.map((template, index) => (
                    <div
                      style={{ cursor: "pointer" }}
                      className="col-md-4"
                      key={index}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardLayout className="mb-3 cursor-pointer">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div className="card-body">
                            <h5 className="card-title">Template {index + 1}</h5>
                            <p className="card-text">{template.message}</p>
                            <p className="card-text">
                              <small className="text-muted">
                                {template?.category?.name}
                              </small>
                            </p>
                          </div>
                          <Button
                            className="btn btn-danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCustomTemplate(template);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardLayout>
                    </div>
                  ))}
                </div>
  )
}

export default Templates