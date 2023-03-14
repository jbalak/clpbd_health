# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Ticket 1 - Update Agents table: Add new external_id column**

Estimate: 1 point (1 day)

Description: We need to provide a way for the facilities to save their own custom ids for Agents, therefore we are going to include a new column on the Agents table to accommodate for that.

Implementation Details:

    - Add column external_id to Agents table, it needs to be a varchar (Since we don't know the type of the ids each Facility uses)

    - Create index for this new column

Acceptance Criteria:

    - New column is added to Agents Table

    - Index is created using this new column

---

**Ticket 2 - Update interfaces and endpoints to use external_id for Agents**

Estimate: 3 points (3-5 days)

Description: We need to provide a way for the facilities to save their own custom ids for Agents. For that, we will update Agents interface to accommodate this new field external_id. We also need to update endpoints for Agents so Facilities can update/access information about their Agents using their own ids.

Dependencies: This needs to be done after Ticket 1

Implementation Details:

    - Update Agent interface adding external_id to it (It needs to be a string)

    - Create a new endpoint for getting a agent by the external_id (We should keep the current endpoint for getting by our internal id for retro compatibility)

    - Create a new endpoint for updating a agent by the external_id (We should keep the current endpoint for updating by our internal id for retro compatibility)

    - Create a new endpoint for deleting a agent by the external_id (We should keep the current endpoint for deleting by our internal id for retro compatibility)

    - Check the create endpoint (POST) and make sure we are saving this new field (external_id) to the DB

    - Update documentation to add new field to interface

Acceptance Criteria:

    - external_id information is available every time Agents information is needed

    - I am able to get, update and delete an Agent using their external_id

    - When a new agent is created their external_id info is saved to db

    - Documentation is updated containing info about external_id

---

**Ticket 3 - Create script for batch updating Agents for Facility (This one can be deprioritized if needed without impacting the final result)**

Estimate: 2 points (2-3 days)

Description: Create a script to update Agents table using information sent by the Facility.

Dependencies: This needs to be done after Ticket 1

Implementation Details:

    - Create a template spreadsheet to be sent to Facilities so they can send us back filled with their info about Agents

    - Create a script that reads that spreadsheet and creates as many SQL Update statements as needed to update Agents Table

    - Add checks to make sure the agent you are updating belongs to that facility

    - To know which agent to update (in case the facility doesn't know our id) search for a unique info (like facility+personal_id)

Acceptance Criteria:

    - A template spreadsheet is created so Facilities can fill their Agents info

    - Using the script with a filled template SQL Update statements are created

    - The statements contains checks for the facility info to make sure its updating only agents of that facility

---

**Ticket 4 - Update report template to use external_id**

Estimate: 2 points (2 days)

Description: Update generateReport method to use external_id instead of our internal id.

Dependencies: This needs to be done after Ticket 1, Ticket 2

Implementation Details:

    - Update generateReport method to show the external_id as the id for the Agent instead of our internal id.

    - If the information about the external_id is not present for that Agent (Facility didn't update it yet, either by the endpoints or using the spreadsheet). Make sure to use our internal id and add a (Internal) marking to the side to make it clear.

Acceptance Criteria:

    - Given a facility id I can generate a shift report and see the facility own id for each Agent (if the information is present in our DB)

    - If we still don't have the external_id filled in our DB we present the AgentId as *internal_id*(Internal)
