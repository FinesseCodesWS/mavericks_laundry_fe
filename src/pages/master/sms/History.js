import { CardLayout, CardHeader } from "../../../components/cards";
import CustomPagination from "../../../components/SmsPagination";


const History = ({smsData, currentPage, setCurrentPage, count, itemsPerPage }) => {
  return (
    <div className="row">
                  <div className="col">
                    <CardLayout className="mb-3">
                      <CardHeader title="SMS History"></CardHeader>
                      <div className="card-body">
                        {smsData?.length > 0 ? (
                          <ul className="list-group">
                            {smsData?.map((data, index) => (
                              <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                              >
                                <div>
                                  <p className="mb-1">{data.message}</p>
                                  <small className="text-muted">
                                    Sent to {data.recipients?.length || 0}{" "}
                                    {data.recipients?.length === 1
                                      ? "person"
                                      : "people"}
                                  </small>
                                </div>
                                <small className="text-muted">
                                  {new Date(data.createdAt).toLocaleString()}
                                </small>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-center text-muted">
                            No SMS history available.
                          </p>
                        )}
                      </div>
                      <div className="mt-3">
                        <CustomPagination
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          count={count}
                          itemsPerPage={itemsPerPage}
                        />
                      </div>
                    </CardLayout>
                  </div>
                </div>
  )
}

export default History