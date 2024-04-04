describe('Exercise API', () => {
  let id;

  it('Add a new exercise', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5300/exercises/add',
      body: {
        username: 'testuser',
        exerciseType: 'Running',
        description: 'Running 5km',
        duration: 30,
        date: new Date()
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Exercise added!');
      id = response.body._id; 
    });
  });

  it('Add a new exercise', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5300/exercises/add',
      body: {
        username: 'testuser',
        exerciseType: 'Gym',
        exerciseSubcategory: 'Bench Press',
        sets: 3,
        reps: 10,
        weightLifted: 100,
        description: 'Bench Press 3 sets of 10 reps with 100 kgs',
        duration: 30,
        date: new Date()
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Exercise added!');
      id = response.body._id; 
    });
  });

  it('Retrieve all exercises', () => {
    cy.request('http://localhost:5300/exercises').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0);
    });
  });
});
