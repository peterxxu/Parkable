import { Form, useLoaderData, useParams } from "react-router-dom";

export default function CommentPage() {
  const comments = useLoaderData();
  //   console.log(comments);
  const parkingLotId = useParams().id;

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div className="card w-50" key={comment.id}>
            <div className="card-body">
              <p className="card-text">{comment.body}</p>
              <Form method="post" action={`/comments/${comment.id}/destroy`}>
                <input type="hidden" name="parkingLotId" value={parkingLotId} />
                <button type="submit" className="btn btn-sm btn-danger">
                  Delete
                </button>
              </Form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
