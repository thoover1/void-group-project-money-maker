import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import "./TicketCard.scss";

const TicketCard = ({text}) => {
  return (
    <div className="ticket">
      <Card>
        <CardContent>
          <Typography gutterBottom>
            {text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketCard;
