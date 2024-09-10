import Table from "../../../components/tables/Draft";

const Draft = ({ drafts, setActiveTab, handleDeleteDraft, navigate }) => {
  return (
    <Table
      thead={["to", "message", "date", "action"]}
      tbody={drafts}
      loading={false}
      setActiveTab={setActiveTab}
      handleDeleteDraft={handleDeleteDraft}
      navigate={navigate}
    />
  );
};

export default Draft;
